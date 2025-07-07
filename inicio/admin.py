from django.contrib import admin
from .models import MensajeContacto, Clase, Reserva, Post

@admin.register(MensajeContacto)
class MensajeContactoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "correo", "asunto", "fecha")
    search_fields = ("nombre", "correo", "asunto")



    
@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "email", "telefono", "clase", "fecha", "hora", "usuario")
    list_filter = ("clase", "fecha")
    search_fields = ("nombre", "email", "telefono", "clase__nombre")
    
   
@admin.register(Clase)
class ClaseAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'instructor', 'descripcion', 'duracion', 'intensidad', 'nivel', 'hora_display')
    list_filter = ('nivel', 'intensidad')  # Agregar filtros válidos, no 'hora' si no es necesario.
    ordering = ('hora_inicio',)  # Cambiar 'hora' por 'hora_inicio' porque 'hora' no existe en el modelo.

    def hora_display(self, obj):
        return obj.hora_inicio.strftime('%H:%M')  # Esto convierte el campo de hora_inicio a formato legible.

    hora_display.short_description = 'Hora'  # Esto es para darle un título amigable en la interfaz de admin.




@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'fecha', 'autor', 'categoria')
    list_filter = ('categoria', 'fecha')
    search_fields = ('titulo', 'contenido')
    prepopulated_fields = {'slug': ('titulo',)}
    ordering = ('-fecha',)







