# Generated by Django 4.1.7 on 2023-04-25 16:49

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("expenses", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="expenses",
            old_name="title",
            new_name="name",
        ),
    ]
