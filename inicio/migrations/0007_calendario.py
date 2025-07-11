# Generated by Django 5.2.3 on 2025-06-24 03:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inicio', '0006_post_slug_alter_post_categoria'),
    ]

    operations = [
        migrations.CreateModel(
            name='Calendario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('instructor', models.CharField(max_length=100)),
                ('dia', models.CharField(choices=[('lunes', 'Lunes'), ('martes', 'Martes'), ('miércoles', 'Miércoles'), ('jueves', 'Jueves'), ('viernes', 'Viernes'), ('sábado', 'Sábado'), ('domingo', 'Domingo')], max_length=10)),
                ('jornada', models.CharField(choices=[('AM', 'AM'), ('PM', 'PM')], max_length=2)),
                ('hora_inicio', models.TimeField()),
                ('hora_fin', models.TimeField()),
                ('clase', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inicio.clase')),
            ],
        ),
    ]
