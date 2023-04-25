# rest framework
from rest_framework import serializers

from expenses.models import Expenses


class ExpensesSerializer(serializers.ModelSerializer):
    can_modify = serializers.SerializerMethodField()

    class Meta:
        model = Expenses
        fields = (
            "id",
            "name",
            "description",
            "date_of_expense",
            "category",
            "amount",
            "created_by",
            "created_at",
            "update_at",
            "can_modify",
        )

    def get_can_modify(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.created_by == request.user
        return False
