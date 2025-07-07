from django.urls import path
from . import views
from .views import contacto_view, clases, reservar_clase

urlpatterns = [
    
    path('about/', views.about, name='about'),
    
    
    path('inventory/', views.inventory, name='inventory'),
    path('lessons/', views.lessons, name='lessons'),
    
    
    path('contact/', views.contact, name='contacto'),
    path('contacto/enviar/', contacto_view, name='contacto_enviar'),
    path('', views.index, name='inicio'),
    path('nosotros/', views.about, name='nosotros'),
    
    path('contacto-footer/', views.footer_contact_view, name='footer_contact'),
    path('clases/', clases, name='clases'),
    #path('clases/editar/<int:clase_id>/', views.editar_clase, name='editar_clase'),
    #path('clases/eliminar/<int:clase_id>/', views.eliminar_clase, name='eliminar_clase'),

    
    path('login/', views.login_view, name='login'),
    path('registro/', views.register_view, name='registro'),
    path('logout/', views.logout_view, name='logout'),
    path('perfil/', views.perfil_view, name='profile'),
    path('reservar/', reservar_clase, name='reservar_clase'),
    # 🟢 Rutas del blog
    path('blog/', views.blog_view, name='blog'),
    path('blog/<int:pk>/', views.blog_detail, name='blog_detail'),  # 👈 ESTA LÍNEA ES CLAVE


]
