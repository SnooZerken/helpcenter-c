<template>
  <v-container>

    <v-row cols="12">
      <v-col>
        <h1>Section <small><v-chip ml-5 small >id {{section.id}}</v-chip></small></h1>
      </v-col>
    </v-row>

    <v-row cols="12">
      <v-col>
        <v-toolbar dense>
            <v-btn small to="/"><v-icon class="mr-2" small>mdi-format-list-bulleted</v-icon>sections</v-btn>
            <v-btn small class="ml-2" @click="adding=true"><v-icon class="mr-2" small>mdi-plus</v-icon>paragraph</v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row cols="12" v-if="adding">
      <v-col>
        <v-card class="pa-3">
          <label>Add a new paragraph</label>
          <v-text-field  label="Provide a title" v-model="newParagraph.title"></v-text-field>
          <v-textarea label="Provide the body" rows="4" auto-grow v-model="newParagraph.body"></v-textarea>
          <v-text-field label="Provide the position" type="number" v-model="newParagraph.weight"></v-text-field>
          <v-btn small class="primary" @click="createParagraph">Create</v-btn>
          <v-btn small class="gray ml-1" @click="adding=false">Cancel</v-btn>
        </v-card>
      </v-col>
    </v-row>      

    <v-sheet
            elevation="12"
            class="mx-auto px-3"
            @mouseover="hovering = true"
            @mouseleave="hovering = false"
            >

      <v-row cols="12">
        <v-col>
          <h2 v-if="!editing">{{ section.title }} 
            <v-icon @click="editing = true" v-if="hovering" medium color="purple darken-2">mdi-circle-edit-outline</v-icon>
          </h2>
          <div v-if="editing">
            <v-text-field  v-model="section.title" @keyup.enter.native="saveAndClose"></v-text-field>
            <v-btn text small color="primary" @click="save">Save</v-btn>
            <v-btn text small color="primary" @click="saveAndClose">Save and Close</v-btn>
            <v-btn text small color="secondary" @click="editing=false">Close</v-btn>    
          </div>      
        </v-col>      
      </v-row>

      <Paragraph v-for="paragraph in orderedParagraphs" :key="paragraph.id"  :value="paragraph"></Paragraph>       

    </v-sheet>

    <v-row cols="12">
      <v-col>
        <v-toolbar dense>
            <v-btn small to="/"><v-icon class="mr-2" small>mdi-format-list-bulleted</v-icon>sections</v-btn>
            <v-btn small class="ml-2" @click="adding=true"><v-icon class="mr-2" small>mdi-plus</v-icon>paragraph</v-btn>
        </v-toolbar>
      </v-col>
    </v-row>    
     
  </v-container>
</template>

// @ is an alias to /src
<script>

import SectionDataService from "../services/SectionDataService"
import ParagraphDataService from "../services/ParagraphDataService"
import Paragraph from "../components/Paragraph";

export default {
  name: 'Section',
  components: {
    Paragraph,
  },
  computed: {
    orderedParagraphs(){
      return this._.orderBy(this.section.paragraphs,'weight');
    },
    maxWeight(){
      return this._.maxBy(this.section.paragraphs,'weight');
    }    
  },  
  async mounted(){
    await this.getSection(this.$route.params.id);

  },
  methods: {
    getSection(id) {
      SectionDataService.get(id)
        .then(response => {
          this.section = response.data;
          console.log(response.data); 
        })
        .catch(e => {
          console.log('There was an error retreiving the section : ' + e); 
        });
    },
    save(){
      var data = {
        "title": this.section.title,
      }

      SectionDataService.update(this.section.id,data)
        .then(response => {
          this.section.title = response.data.title;
          console.log(response.data); 
        })
        .catch(e => {
          console.log('There was an error updating the section : ' + e); 
        });

    },
    saveAndClose(){
      this.save();
      this.editing = false;
      this.hovering =false;
    },
    createParagraph(){
      var data = {
        title: this.newParagraph.title,
        body: this.newParagraph.body,
        weight: this.newParagraph.weight,
        section: {
          id: this.section.id
        }
      }
      ParagraphDataService.create(data)
        .then(response => {
          this.newParagraph.body = response;
          this.getSection(this.section.id);
          this.adding=false;
        })
        .catch(e => {
          console.log('There was an error creating the paragraph : ' + e);
        });

    }
  },
  data () {
    return {
      section: {},
      hovering: false,
      editing: false,
      adding:false,
      newParagraph:{
        title: "",
        body: "",
        weight: 0,
      }
    }
  }
}

</script>
