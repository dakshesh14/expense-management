from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


CATEGORIES = (
    ("health", "Health"),
    ("electronics", "Electronics"),
    ("transport", "Transport"),
    ("education", "Education"),
    ("book", "Book"),
    ("other", "Other"),
)


class Expenses(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    date_of_expense = models.DateField()

    category = models.CharField(max_length=100, choices=CATEGORIES, default="other")

    # we can also use DecimalField with validators to check if the amount is positive
    amount = models.PositiveIntegerField()

    created_by = models.ForeignKey(
        User, related_name="expenses", on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.amount} by {self.created_by.username}"
