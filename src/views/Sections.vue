<template>
  <v-container>

    <v-row cols="12">
      <v-col>
        <h1>Section overview</h1>
        <p>Overview all sections in the entire application</p>
      </v-col>
    </v-row>

    <v-row cols="12">
      <v-col>
        <v-toolbar dense>

          <v-text-field @keyup.enter.native="findByTitle" v-model="searchedTitle" single-line hide-details label="search"></v-text-field>
          <v-btn class="ml-2" small @click="findByTitle">Search</v-btn>
          <v-btn class="ml-2 blue lighten-2" small @click="adding=true">New</v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row cols="12" v-if="adding">
      <v-col>
        <v-card class="pa-3">
          <label>Add a new section</label>
          <v-text-field label="Provide a title" v-model="newSection.title"></v-text-field>
          <v-btn small class="primary" @click="createSection">Create</v-btn>
          <v-btn small class="gray ml-1" @click="adding=false">Cancel</v-btn>
        </v-card>
      </v-col>
    </v-row>    

    <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Title</th>
              <th class="text-richt">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="section in sections" :key="section.id">
              <td>{{ section.id }}</td>
              <td>{{ section.title }}</td>
              <td> 
                  <v-btn :to="'/sections/' + section.id" icon color="blue lighten-2"><v-icon>mdi-eye-circle</v-icon></v-btn>
                  <v-btn @click="deleteSection(section.id)" icon color="red lighten-2"><v-icon>mdi-delete</v-icon></v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>      

  </v-container>
</template>

// @ is an alias to /src
<script>

import SectionDataService from "../services/SectionDataService";

export default {
  name: 'Sections',
  components: {

  },
  async mounted(){
    this.retrieveSections();
  },
  methods: {
    retrieveSections() {
      SectionDataService.getAll()
        .then(response => {
          this.sections = response.data;
          console.log(response.data); 
        })
        .catch(e => {
          console.log('There was an error retreiving the sections : ' + e); 
        });
    },
    findByTitle(){
      SectionDataService.findByTitle(this.searchedTitle)
        .then(response => {
          this.sections = response.data;
          console.log(response.data); 
        })
        .catch(e => {
          console.log('There was an error retreiving the sections : ' + e); 
        });      
    },
    createSection(){
      SectionDataService.create(this.newSection)
        .then(response => {
          this.newSection.title = response.data.title;
          this.retrieveSections();
          this.newSection.title = '';
        })
        .catch(e => {
          console.log('There was an error creating the section : ' + e);
        });
    },
    deleteSection(id){
      SectionDataService.delete(id)
        .then(response => {
          this.newSection.title = response.data.title;
          this.retrieveSections();
          this.newSection.title = '';
        })
        .catch(e => {
          console.log('There was an error creating the section : ' + e);
        });
    }
  },
  data () {
    return {
      sections: [],
      adding: false,
      newSection: {
        "title": "",
      },
      searchedTitle:"",
    }
  },
  computed:{

  }
}

</script>
