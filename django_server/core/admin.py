from django.contrib import admin


class StaffAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return True

    def has_change_permission(self, request, obj=None):
        return True

    def has_module_permission(self, request):
        return True

    def has_delete_permission(self, request, obj=None):
        return True
