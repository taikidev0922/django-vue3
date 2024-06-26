from django.db import models
import uuid

class Book(models.Model):
    class Meta:
        db_table = 'book'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(verbose_name='タイトル',max_length=200)
    price = models.IntegerField(verbose_name='価格',null=True,blank=True)
    created_at = models.DateTimeField(verbose_name='登録日',auto_now_add=True)

    def __str__(self):
        return self.title

