# Generated by Django 3.2.9 on 2021-11-24 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ProcessedRecord', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='processedrecord',
            name='Customer_id',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='processedrecord',
            name='Policy_id',
            field=models.IntegerField(null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='processedrecord',
            name='Premium',
            field=models.IntegerField(),
        ),
    ]
