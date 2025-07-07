from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from datetime import time

class MensajeContacto(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField()
    asunto = models.CharField(max_length=200)
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.asunto}"


# modelo para las lecciones 

class Clase(models.Model):
    nombre = models.CharField(max_length=100)
    instructor = models.CharField(max_length=100)
    descripcion = models.TextField()
    duracion = models.PositiveIntegerField()  # En minutos
    intensidad = models.CharField(max_length=50)
    nivel = models.CharField(max_length=50)
    imagen = models.ImageField(upload_to='clases/', null=True, blank=True)

    # Campos para gestionar el horario
    dia = models.CharField(max_length=10, choices=[ 
        ('lunes', 'Lunes'),
        ('martes', 'Martes'),
        ('miércoles', 'Miércoles'),
        ('jueves', 'Jueves'),
        ('viernes', 'Viernes'),
        ('sábado', 'Sábado'),
        ('domingo', 'Domingo'),
    ])
    

    hora_inicio = models.TimeField(default=time(0, 0))
    hora_fin = models.TimeField()  # Hora de fin de la clase

    def __str__(self):
        return f"{self.nombre} ({self.dia} {self.hora_inicio})"



class Reserva(models.Model):
    clase = models.ForeignKey(Clase, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    notas = models.TextField(blank=True)
    fecha = models.DateField()
    hora = models.TimeField()
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.clase.nombre}"
    
   
    
# Modelo para Post del blog

class Post(models.Model):
    CATEGORIAS = [
        ('Entrenamiento', 'Entrenamiento'),
        ('Nutrición', 'Nutrición'),
        ('Bienestar', 'Bienestar'),
        ('Motivación', 'Motivación'),
        ('Equipamiento', 'Equipamiento'),
    ]

    titulo = models.CharField(max_length=200)
    contenido = models.TextField()
    autor = models.CharField(max_length=100)
    fecha = models.DateField(auto_now_add=True)
    categoria = models.CharField(max_length=20, choices=CATEGORIAS)
    imagen = models.ImageField(upload_to='blog/', null=True, blank=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titulo)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.titulo

    
    

