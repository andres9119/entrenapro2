# Generated by Django 5.2.3 on 2025-06-15 04:00

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inicio', '0002_clase'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Reserva',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('telefono', models.CharField(max_length=20)),
                ('notas', models.TextField(blank=True)),
                ('fecha', models.DateField()),
                ('hora', models.TimeField()),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('clase', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inicio.clase')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
