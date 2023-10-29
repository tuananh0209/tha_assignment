from django.contrib import admin
from core.admin import StaffAdmin
from products.models import Product, Size, ProductEntry, Color, Image


@admin.register(Size)
class SizeAdmin(StaffAdmin):
    pass


@admin.register(Color)
class ColorAdmin(StaffAdmin):
    pass


@admin.register(Image)
class ImageAdmin(StaffAdmin):
    pass


class ImagesInline(admin.TabularInline):
    model = Image
    raw_id_fields = ("product",)

    def has_add_permission(self, request, obj=None):
        return True

    def has_change_permission(self, request, obj=None):
        return True

    def has_module_permission(self, request):
        return True

    def has_delete_permission(self, request, obj=None):
        return True


@admin.register(Product)
class ProductAdmin(StaffAdmin):
    inlines = (ImagesInline, )
    search_fields = ("name", )
    list_display = ("name", "price")


@admin.register(ProductEntry)
class ProductEntryAdmin(StaffAdmin):
    search_fields = ("product__name", "quantity", )
    list_filter = ("size", "color", )
    list_display = ("product", "size", "color", "quantity", )
    raw_id_fields = ("product", )
