<template>
  <v-container >

    <div v-if="!editing" 
          @mouseover="hovering = true"
          @mouseleave="hovering = false"
          :class="[hovering ? 'light-blue lighten-5' : '']"
          @click="editing = true" >
      <h3>{{ paragraph.title }} </h3> 
      <p> {{ paragraph.body }} </p>            
    </div>

    <div v-if="editing">
      <v-text-field label="Title" v-model="paragraph.title" @keyup.enter.native="saveAndClose"></v-text-field>
      <v-textarea label="Body" rows="4" auto-grow v-model="paragraph.body"></v-textarea>
      <v-text-field label="Weight" type="number" v-model="paragraph.weight" @keyup.enter.native="saveAndClose"></v-text-field>
      <v-btn text small color="primary" @click="save">Save</v-btn>
      <v-btn text small color="primary" @click="saveAndClose">Save and Close</v-btn>
      <v-btn text small color="secondary" @click="editing=false">Close</v-btn>   
      <v-btn text small color="warning" @click="deleteParagraph">Delete</v-btn>     
    </div>      

  </v-container>  
</template>

// @ is an alias to /src
<script>

import ParagraphDataService from "../services/ParagraphDataService";

export default {
  name: 'paragraph-component',
  components: {

  },
  props:{
    value: {},
  },
  methods: {
    save() {
      
      ParagraphDataService.update(this.paragraph.id,this.paragraph)
        .then(response => {
          this.paragraph = response.data;
          console.log(response.data); 

          this.$emit('input', this.paragraph);
        })
        .catch(e => {
          console.log('There was an error updating paragraph : ' + e); 
        });

        
    },
    saveAndClose(){
      this.save();
      this.editing = false;
      this.hovering =false;
    },
    deleteParagraph(){
      ParagraphDataService.delete(this.paragraph.id)
        .then(response => {
          this.paragraph = response.data;
          console.log(response.data); 

          this.$emit('input', this.paragraph);
        })
        .catch(e => {
          console.log('There was an error deleting this paragraph : ' + e); 
      });
      this.editing = false;
      this.hovering =false;        
    }
  }, 
  data () { 
    return {
      paragraph: Object.assign({}, this.value),
      editing: false,
      hovering:false,
    }
  }
}

</script>
