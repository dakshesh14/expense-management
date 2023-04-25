# rest framework
from rest_framework import serializers

from expenses.models import Expenses

from accounts.api.serializers import UserSerializer


class ExpensesSerializer(serializers.ModelSerializer):
    can_modify = serializers.SerializerMethodField()
    category_display = serializers.SerializerMethodField()
    user_details = UserSerializer(source="created_by", read_only=True)

    class Meta:
        model = Expenses
        fields = (
            "id",
            "name",
            "description",
            "date_of_expense",
            "category",
            "category_display",
            "amount",
            "created_by",
            "user_details",
            "created_at",
            "update_at",
            "can_modify",
        )

    def get_can_modify(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.created_by == request.user
        return False

    def get_category_display(self, obj):
        return obj.get_category_display()
