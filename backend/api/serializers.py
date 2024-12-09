from django.contrib.auth.models import User
from rest_framework import serializers
import re

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "password"]
        extra_kwargs = {
            "email": {
                "write_only": True,
                "required": True
            },
            "password": {
                "write_only": True,
                "required": True,
                "min_length": 8 
            }
        }
    def validate_email(self, value):
        # Vérifie si l'email existe déjà
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Cet email existe déjà")
        
        # Vérifie le format de l'email
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, value):
            raise serializers.ValidationError("Format d'email invalide")
        
        return value

    def create(self, validated_data):
        validated_data['username'] = validated_data['email']
        user = User.objects.create_user(**validated_data)
        return user


