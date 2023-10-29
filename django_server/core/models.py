import uuid
from django.db import models
from model_utils.models import TimeStampedModel
# Create your models here.


class UUIDModel(TimeStampedModel):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)

    class Meta:
        abstract = True
