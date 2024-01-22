<script lang="ts">
import { ref } from "vue";
//import { uploadFile } from "./api";
import type { SelectedFile } from "../../types";
import FileItem from "./FileItem.vue";

export default {
  data() {
    return {
      selectedFiles: ref([] as SelectedFile[]),
      isUploading: false
    }
  },

  components: { FileItem },
  
  computed: {
    computed: function() {
      return this.selectedFiles.some((file) => file.status == "uploading");
    }
  },

  methods: {
    clearFiles () {
      this.selectedFiles = []
    },

    onSelectFiles(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files === null) {
        return;
      }

      this.clearFiles();

      Array.from(target.files).forEach((file: File) => {
        this.selectedFiles.push({
          file: file,
          percentage: 0,
          status: "pending",
        } as SelectedFile);
      });
    },

    async uploadFile(file: any, event: any) {
      console.log(event.target.loaded);
      //file.percentage = Math.round((100 * event.loaded) / event.total);
      file.percentage = 100;
    },

    uploadSelectedFiles(event: any) {
      this.selectedFiles.forEach(async (file: SelectedFile) => {
      file.status = "uploading";
      file.percentage = 0;

      await this.uploadFile(file.file, event)
        .then(() => {
          file.status = "success";
        })
        .catch(() => {
          file.status = "failed";
        });
      });
    }
      
  }
}
</script>

<template>
  <main>
    <div class="wrapper">
      <!-- Files list -->
      <div class="files-list">
        <b v-if="selectedFiles.length">Files ({{ selectedFiles.length }}):</b>
        <!-- File item -->
        <FileItem
          v-for="file in selectedFiles"
          :key="file.file.name"
          :file="file"
        />
      </div>
      <!-- Hidden file input -->
      <input
        id="selectBtn"
        type="file"
        multiple
        title="Upload file"
        @change="onSelectFiles"
      />
      <div class="hr" v-if="selectedFiles.length"></div>
      <!-- Buttons -->
      <div class="buttons" :class="{ centered: selectedFiles.length === 0 }">
        <label
          class="button"
          :class="{ disabled: isUploading }"
          for="selectBtn"
        >
          Select files
        </label>
        <a
          class="button button-danger"
          :class="{ disabled: isUploading }"
          href="#"
          @click.prevent="clearFiles"
          v-if="selectedFiles.length"
          >Clear</a
        >
        <a
          class="button button-upload"
          :class="{ disabled: isUploading }"
          href="#"
          @click.prevent="uploadSelectedFiles($event)"
          v-if="selectedFiles.length"
          >Upload</a
        >
      </div>
    </div>
  </main>
</template>

<style scoped>

.wrapper {  
  border: 1px dashed lightgray;
  border-radius: 0.5rem;
  text-align: center;
  margin: auto;
  margin-bottom: 5%;
  width: 40%;
  padding: 2rem;
  flex-direction: column;
  display: flex;
  gap: 1rem;
}


#selectBtn {
  display: none;
}

.hr {
  width: 100%;
  height: 1px;
  background-color: lightgray;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.buttons {
  text-align: center;
  display: flex;
  gap: 1rem;

  &.centered {
    justify-content: center;
  }
}

.button {
  cursor: pointer;

  color: white;
  background: #a886d9;
  text-decoration: none;

  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 2px;

  &:hover {
    background: #8b34f5;
  }

  &.disabled {
    cursor: default;
    background: lightgray;
    pointer-events: none;
  }
}

.button-danger {
  background: #f08080;

  &:hover {
    background: #f65959;
  }
}

.button-upload {
  background: #00d591;

  &:hover {
    background: #02b97f;
  }
} 
</style>