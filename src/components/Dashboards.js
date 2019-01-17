import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import {admin} from '../firebase.js';
import TableauReport from 'tableau-react';

import Dashes from '../Dashboards.json'

// Initialize firestore
let db = admin.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

class Dashboards extends Component {
    constructor(props) {
        super(props);

        this.state = {
          redirect: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
      let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;

      this.setState({
        [name]: value,
      });
    }

    componentDidMount(){
      admin.auth().onAuthStateChanged((user) => {
        if(user === null) {
          this.setState({redirect: true});
        }
        var data = {
          name: user.displayName,
          email: user.email,
          dashboards: 'IT'
        };

        // Add a new document in collection "cities" with ID 'LA'
        var userRef = db.collection('users').doc(user.uid);

        var setWithOptions = userRef.set(data, {merge: true});

        // if the team of the individual is of a certain type, render a certain group of Dashboards
        var getDoc = userRef.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              console.log('Document data:', doc.data().team);
              // While user's 'team' matches the doc, render it
              for (var i = 0; i < Dashes.dashboards.length; i++) {
                console.log(Dashes.dashboards[i].url);
                // if (Dashes.dashboards[i].group === doc.data().team) {
                //
                // }
              }
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
      });
    }

    // if not in firestore then add
    databaseRecord() {

    }

    componentWillMount() {
      // admin.auth().onAuthStateChanged((user) => {
      //   var data = {
      //     name: user.displayName,
      //     email: user.email,
      //     dashboards: 'IT'
      //   };
      //
      //   // Add a new document in collection "cities" with ID 'LA'
      //   var userRef = db.collection('users').doc(user.uid);
      //
      //   // if the team of the individual is of a certain type, render a certain group of Dashboards
      //   var getDoc = userRef.get()
      //     .then(doc => {
      //       if (!doc.exists) {
      //         console.log('No such document!');
      //       } else {
      //         console.log('Document data:', doc.data().team);
      //         // While user's 'team' matches the doc, render it
      //         for (var i = 0; i < Dashes.dashboards.length; i++) {
      //           console.log(Dashes.dashboards[i].url);
      //           // if (Dashes.dashboards[i].group === doc.data().team) {
      //           //
      //           // }
      //         }
      //       }
      //     })
      //     .catch(err => {
      //       console.log('Error getting document', err);
      //     });
      // });
    }
    componentWillUnmount() {

    }

    handleSubmit(e) {
      e.preventDefault();
      //on submit, set data in firebase equal to this new data
    }

    render() {
      if(this.state.redirect === true) {
        return <Redirect to='/login' />
      }
        return (
          <div>
            <h1>Signed In</h1>
            <TableauReport url='https://public.tableau.com/views/AgendaMedellnODS/Portada?:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=yes'/>
          </div>
        );
    }
}
export default Dashboards;
