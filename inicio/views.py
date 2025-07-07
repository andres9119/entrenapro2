from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
from .models import MensajeContacto, Clase, Reserva, Post
from .forms import ContactoForm
from django.shortcuts import render, redirect, get_object_or_404
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, Group
import json
from django.views.decorators.http import require_POST
from datetime import time
from datetime import datetime, timedelta




@csrf_exempt  # Solo si no estás usando el token CSRF correctamente (en producción debe evitarse)
def contacto_view(request):
    if request.method == "POST":
        nombre = request.POST.get("name")
        correo = request.POST.get("email")
        asunto = request.POST.get("subject")
        mensaje = request.POST.get("message")

        # Guardar mensaje
        MensajeContacto.objects.create(
            nombre=nombre,
            correo=correo,
            asunto=asunto,
            mensaje=mensaje
        )

        # Devolver respuesta JSON para JavaScript
        return JsonResponse({
            "success": True,
            "message": "Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto."
        })

    # Si es GET (por error), se puede responder así:
    return JsonResponse({
        "success": False,
        "message": "Método no permitido."
    }, status=405)





def index(request):
    return render(request, 'inicio/index.html')

def about(request):
    return render(request, 'inicio/about.html')

from django.shortcuts import render

def blog(request):
    return render(request, 'inicio/blog.html')  # Asegúrate de que esta plantilla exista



def inventory(request):
    return render(request, 'inicio/inventory.html')  # Asegúrate de que esta plantilla exista
def lessons(request):
    return render(request, 'inicio/lessons.html')  # Asegúrate de que esta plantilla exista

def contact(request):
    return render(request, 'inicio/contact.html')  # Asegúrate de que esta plantilla exista


#from django.views.decorators.csrf import csrf_exempt

#@csrf_exempt

def footer_contact_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        mensaje = request.POST.get('message')

        cuerpo = f"""
        Nuevo mensaje desde el formulario del footer:

        Correo: {email}
        Mensaje:
        {mensaje}
        """

        try:
            send_mail(
                subject='Mensaje desde el footer de EntrenarPro',
                message=cuerpo,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
            )
            messages.success(request, 'Gracias por tu mensaje. ¡Te contactaremos pronto!')
        except Exception as e:
            messages.error(request, 'Error al enviar el mensaje. Intenta nuevamente.')

    return redirect('inicio')  # Redirige al home, puedes cambiarlo



# views.py
from django.shortcuts import render
from .models import Clase

def clases(request):
    clases = Clase.objects.all()  # Obtener todas las clases
    dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
    horas = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

    # Agrupar las clases por día
    clases_por_dia = {dia: [] for dia in dias}
    for clase in clases:
        clases_por_dia[clase.dia].append(clase)

    contexto = {
        'clases': clases,  # Asegúrate de pasar 'clases' directamente
        'clases_por_dia': clases_por_dia,
        'dias': dias,
        'horas': horas,
    }

    return render(request, 'inicio/lessons.html', contexto)






def calendario(request):
    # Obtener todas las clases con sus horarios
    clases = Clase.objects.all()

    # Organizar las clases por día para el calendario
    dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
    clases_por_dia = {dia: Clase.objects.filter(dia=dia) for dia in dias}

    contexto = {
        "clases_por_dia": clases_por_dia,
    }

    return render(request, "inicio/lessons.html", contexto)




# Reservar clase


@login_required
@require_POST
def reservar_clase(request):
    try:
        print("⏩ Recibiendo solicitud de reserva...")
        data = json.loads(request.body)
        print("📦 Datos recibidos:", data)

        clase = Clase.objects.get(nombre=data['nombre'])
        print("✅ Clase encontrada:", clase)

        reserva = Reserva.objects.create(
            clase=clase,
            usuario=request.user,
            nombre=data['nombre_usuario'],
            email=data['email'],
            telefono=data['telefono'],
            notas=data.get('notas', ''),
            fecha=datetime.strptime(data['fecha'], '%Y-%m-%d').date(),
            hora=datetime.strptime(data['hora'], '%H:%M').time()
        )

        print("✅ Reserva creada:", reserva)
        return JsonResponse({'mensaje': 'Reserva realizada con éxito'})
    
    except Clase.DoesNotExist:
        print("❌ Clase no encontrada:", data['nombre'])
        return JsonResponse({'error': 'Clase no encontrada'}, status=404)
    
    except Exception as e:
        print("❌ Error al crear reserva:", str(e))
        return JsonResponse({'error': str(e)}, status=400)



@login_required
@user_passes_test(lambda u: u.is_staff)
def editar_clase(request, clase_id):
    # lógica para editar clase
    pass

@login_required
@user_passes_test(lambda u: not u.is_staff)
def realizar_reserva(request):
    # lógica para reservar
    pass


# login y register



@csrf_protect
def login_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        try:
            user = User.objects.get(email=email)
            user = authenticate(request, username=user.username, password=password)
            if user is not None:
                login(request, user)
                return redirect('clases')  
            else:
                messages.error(request, 'Correo o contraseña inválidos.')
        except User.DoesNotExist:
            messages.error(request, 'Correo no registrado.')
    return render(request, 'inicio/login.html') 

@csrf_protect
def register_view(request):
    if request.method == 'POST':
        name = request.POST['name']
        email = request.POST['email']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']
        
        if password != confirm_password:
            messages.error(request, 'Las contraseñas no coinciden.')
            return redirect('registro')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'El correo ya está registrado.')
            return redirect('registro')

        username = email.split('@')[0]
        user = User.objects.create_user(username=username, email=email, password=password)
        user.first_name = name
        user.save()

        from django.contrib.auth.models import Group

        # Intenta obtener el grupo, y si no existe, lo crea
        clientes_group, created = Group.objects.get_or_create(name='Clientes')  # crea el grupo si no existe
        clientes_group.user_set.add(user)

        messages.success(request, 'Registro exitoso. Ahora puedes iniciar sesión.')
        return redirect('login')

    return render(request, 'inicio/login.html')


@login_required
def logout_view(request):
    logout(request)
    return redirect('inicio')


@login_required
def perfil_view(request):
    return render(request, 'inicio/perfil.html', {'usuario': request.user})

from django.shortcuts import render, get_object_or_404
from .models import Post



def blog_view(request):
    posts = Post.objects.all().order_by('-fecha')
    destacado = posts.first()
    restantes = posts[1:4]
    return render(request, 'inicio/blog.html', {
        'destacado': destacado,
        'posts': restantes,
    })





import markdown

def blog_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    # Si el contenido está en Markdown, lo convertimos a HTML
    post_content = markdown.markdown(post.contenido)
    return render(request, 'inicio/blog_detail.html', {'post': post, 'post_content': post_content})
