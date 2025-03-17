<template>
    <div class="container-xl">
        <div class="row">
            <DesktopLeftNav class="col-md-3 d-none d-md-flex p-0"/>
            <!-- Homepage post Feeed -->
            <section class="col-12 col-md-9 col-lg-6">

                <h2 style="margin-top:80px" class="post-title">Edit your profile</h2>
                <EditProfileForm/>

            </section>
            <!-- End homepage post Feeed -->
            <DesktopRightNav class="col-lg-3 d-none d-lg-flex" />
        </div>

        <MobileBottomNav activeIcon="home" class="d-md-none"/>

        <BurgerMenu/>
    </div>
</template>

<script>
import EditProfileForm from '../../components/forms/EditProfileForm.vue';

export default {
    components:{EditProfileForm},
}
</script>