<template>
  <div id="app" >
    <Nav></Nav>
    <div class="marginPrincipal">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import Nav from './components/_nav/Nav'

export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>

<style>

body{
  background-color: #eee;
  font-family: "Arial", sans-serif;
  display: grid;
  justify-items: center;
}
body, html {
  margin: 0;
  height: 100%;
}
.marginPrincipal {
     width: 50%;
     margin: auto;
}
#app {
  width: 100%
}

.btn_Danger {
  font-size: 0.8em !important;
  background-color: #fa4430;
}

.btn{
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #000;
  font-size: 1.2em;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  border-bottom: 3px solid black;
}
.btn:hover{
  text-shadow: 1px 1px 1px black;
  margin-top: 3px;
  border-bottom: 1px solid black;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even){background-color:white }
td.button{
  color: #000;
}

/* Style inputs, select elements and textareas */
input[type="text"],
input[type="email"],
input[type="number"],
input[type="date"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

/* Style the label to display next to the inputs */
label  {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

/* Style the submit button */
.btnForm {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: center;
  margin-right: 5px;
}

/* Style the container */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

/* Floating column for labels: 25% width */
.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

/* Floating column for inputs: 75% width */
.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25,
  .col-75,
  input[type="submit"] {
    width: 100%;
    margin-top: 0;
  }
}
</style>
