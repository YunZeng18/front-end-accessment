import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import StudentList from './component/studentList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      filteredByName: "",
      filteredByTag: ""
    }
  }

  filterByNameHandler = event => {
    this.setState({ filteredByName: event.target.value.toLowerCase() });
  };

  filterByTagHandler = event => {
    this.setState({ filteredByTag: event.target.value.toLowerCase() });
  }

  //set the display:boolean for each student base on filteredByName and filteredByTag
  filter() {
    let students = [...this.state.students];
    students = students.map(
      item => {
        if ((item.firstName.toLowerCase().includes(this.state.filteredByName) || item.lastName.toLowerCase().includes(this.state.filteredByName))
          && (this.hasTag(item.tag, this.state.filteredByTag))) {
          return { ...item, display: true }
        } else { return { ...item, display: false } }
      })
    this.setState({
      students: students
    })
  }

  //check if a student has a taglist, if so does it have desired tag
  hasTag(tagList, filter) {
    if (filter === '') return true;
    else if (tagList === undefined) return false;
    else {
      for (let i = 0; i < tagList.length; i++) {
        if (tagList[i].toLowerCase().includes(filter.toLowerCase())) return true;
      }
      return false;
    }
  }


  handleGradesToggle = (_e, id) => {
    let students = [...this.state.students];
    let index = students.findIndex(item => item.id === id)
    let student = { ...students[index], gradesDisplay: !this.state.students[index].gradesDisplay };
    students[index] = student;
    this.setState({
      students: students
    });

  }

  //set state of tag of the student when enter is pressed, then empty the input value
  handleAddTag = (e, id) => {
    if (e.key === 'Enter' && e.target.value) {
      let students = [...this.state.students];
      let tag = [];
      let i = students.findIndex(item => item.id === id);
      if (this.state.students[i].tag) {//if there are previous tags
        tag = this.state.students[i].tag;
        tag.push(e.target.value);
      }
      else tag.push(e.target.value);

      e.currentTarget.value = "";
      let student = { ...students[i], tag: tag };
      students[i] = student;

      this.setState({
        students: students
      })
    }

  }

  //update the student list as character is typed into search
  componentDidUpdate(prevProps, prevState) {
    if (prevState.filteredByName !== this.state.filteredByName || prevState.filteredByTag !== this.state.filteredByTag) {
      this.filter();
    }
  }

  getStudentList() {
    axios.get(`https://api.hatchways.io/assessment/students`)
      .then((response) => {
        let students = response.data.students;
        students = students.map(item => { return { ...item, display: true } });//display is used to decide what is shown
        this.setState({
          students: students
        })
      })
      .catch(error => console.log(error));
  }
  componentDidMount() {
    this.getStudentList();
  }



  render() {

    return (
      <div className="App">
        <section className="container">
          <input className="searchBar" type="search" placeholder="Search by name" onChange={this.filterByNameHandler} />
          <input className="searchBar" type="search" placeholder="Search by tag" onChange={this.filterByTagHandler} />
          <StudentList students={this.state.students} onClick={this.handleGradesToggle} addTag={this.handleAddTag} />
        </section>
      </div>
    );
  }
}

export default App;
