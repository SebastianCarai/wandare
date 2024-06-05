<template>
    <div>
        <div class="input-wrapper">      
            <label class="input-label" for="post-title">Choose post title</label>
            <div class="input-description">Where have you been?</div>
            <input class="input-field-text" type="text" name="post-title" placeholder="Type here...">
        </div>

        <div class="input-wrapper">
            <div class="input-label">Choose post thumbnails</div>
            <div class="input-description">Pick at least one image (max 5) to display in the preview </div>
            <div class="file-input-wrapper">
                <label class="file-label" for="images">
                    <i class="fa-solid fa-square-plus"></i>
                    <input @change="photoUploaded" class="input-field-file" id="images" type="file" name="images" accept="image/*" required multiple hidden>
                </label>
            </div>
        </div>

        <div class="d-flex justify-content-between">
            <div @click="$store.commit('decreasePostCreationStep')" class="form-btn">Previous</div>
            <div @click="$store.commit('increasePostCreationStep')" class="form-btn">Next</div>
        </div>
        
    </div>
</template>

<script>
export default {
    
}
</script>