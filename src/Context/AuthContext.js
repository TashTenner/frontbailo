import React, { Component, createContext } from 'react';
import authService from '../services/authService';
// import Loading from '../components/Loading/Loading';

const AuthContext = createContext();

const Provider = AuthContext.Provider;

const AuthConsumer = AuthContext.Consumer;

export const withAuth = (Comp) => {
  return class WithAuth extends Component {
    
    render() {
      return (
        <AuthConsumer>
          { 
            ({isLoading,
              isLoggedin,
              user,
              handleLogin,
              handleLogout,
              handleSignup
//             handleProfileUpdate,
//             handleUserDelete,
            }) => <Comp {...this.props} isLoading={isLoading} isLoggedin={isLoggedin} user={user} handleLogin={handleLogin} handleLogout={handleLogout} handleSignup={handleSignup} 
            /*  handleProfileUpdate={handleProfileUpdate}
            //               handleUserDelete={handleUserDelete}
            //              */
            />
          }
        </AuthConsumer>
      )
        
    }
  }
}

export default class AuthProvider extends Component {
  state = {
    isLoggedin: false,
    user: undefined,
    isLoading: true,
  }

  componentDidMount() {
    authService.me()
    .then((user) => {
        this.setState({
          isLoggedin: true,
          user,
          isLoading: false,
        })
        
        console.log('me', user);
      })
      .catch(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  handleLogin = (user) => {
    authService.login(user)
      .then((loggedUser) => {
        this.setState({
          isLoggedin: true,
          user: loggedUser,
          isLoading: false
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  handleSignup = (user) =>{
    authService.signup(user)
    .then((registredUser) =>{
      this.setState({
        isLoggedin: true,
        user: registredUser,
        isLoading: false
      })
    })
    .catch(() =>{
      this.setState({
        isLoading: false,
      })
    })
  }

//   handleProfileUpdate = user => {
//     authService
//       .profileUpdate(user)
//       .then(registeredUser => {
//         this.setState({
//           isLoggedin: true,
//           user: registeredUser,
//           isLoading: false,
//         });
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false,
//         });
//       });
//   };

//   handleUserDelete = () => {
//     this.setState({
//       isLoading: true,
//     });
//     authService
//       .userDelete()
//       .then(() => {
//         this.setState({
//           isLoggedin: false,
//           user: undefined,
//           isLoading: false,
//         });
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false,
//           isLoggedin: false,
//           user: undefined,
//         });
//       });
//   };

  handleLogout = () => {
    this.setState({
      isLoading: true,
    })
    authService.logout()
      .then(() => {
        this.setState({
          isLoggedin: false,
          user: undefined,
          isLoading: false,
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isLoggedin: false,
          user: undefined,
        })
      })
  }

  render() {
    const { isLoading, isLoggedin, user } = this.state
    const { children } = this.props;
    if (isLoading) {
      return <div>Loading...</div>
    } else {
      return (
        <Provider value={{
          isLoading,
          isLoggedin,
          user,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          handleSignup: this.handleSignup
//           handleProfileUpdate: this.handleProfileUpdate,
//           handleUserDelete: this.handleUserDelete,
        }}>
          {children}
        </Provider>
      )
    }
  }
}


// // eslint-disable-next-line max-classes-per-file
// import React, { Component, createContext } from 'react';
// import authService from '../services/authService';
// import Loading from '../components/Loading/Loading';

// const AuthContext = createContext();

// const { Provider } = AuthContext;

// const AuthConsumer = AuthContext.Consumer;

// export const withAuth = Comp => {
//   return class WithAuth extends Component {
//     render() {
//       return (
//         <AuthConsumer>
//           {({
//             isLoading,
//             isLoggedin,
//             user,
//             handleLogin,
//             handleLogout,
//             handleSignup,
//             handleProfileUpdate,
//             handleUserDelete,
//           }) => (
//             <Comp
//               {...this.props}
//               isLoading={isLoading}
//               isLoggedin={isLoggedin}
//               user={user}
//               handleLogin={handleLogin}
//               handleLogout={handleLogout}
//               handleSignup={handleSignup}
//               handleProfileUpdate={handleProfileUpdate}
//               handleUserDelete={handleUserDelete}
//             />
//           )}
//         </AuthConsumer>
//       );
//     }
//   };
// };

// export default class AuthProvider extends Component {
//   state = {
//     isLoggedin: false,
//     user: undefined,
//     isLoading: true,
//   };

//   componentDidMount() {
//     authService
//       .me()
//       .then(user => {
//         this.setState({
//           isLoggedin: true,
//           user,
//           isLoading: false,
//         });
//         console.log('me', user);
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false,
//         });
//       });
//   }

//   handleLogin = user => {
//     authService
//       .login(user)
//       .then(loggedUser => {
//         this.setState({
//           isLoggedin: true,
//           user: loggedUser,
//           isLoading: false,
//         });
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false,
//         });
//       });
//   };

//   handleSignup = user => {
//     authService
//       .signup(user)
//       .then(registeredUser => {
//         this.setState({
//           isLoggedin: true,
//           user: registeredUser,
//           isLoading: false,
//         });
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false,
//         });
//       });
//   };

//   handleProfileUpdate = user => {
//     authService
//       .profileUpdate(user)
//       .then(registeredUser => {
//         this.setState({
//           isLoggedin: true,
//           user: registeredUser,
//           isLoading: false,
//         });
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false,
//         });
//       });
//   };

//   handleLogout = () => {
//     this.setState({
//       isLoading: true,
//     });
//     authService
//       .logout()
//       .then(() => {
//         this.setState({
//           isLoggedin: false,
//           user: undefined,
//           isLoading: false,
//         });
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false,
//           isLoggedin: false,
//           user: undefined,
//         });
//       });
//   };

//   handleUserDelete = () => {
//     this.setState({
//       isLoading: true,
//     });
//     authService
//       .userDelete()
//       .then(() => {
//         this.setState({
//           isLoggedin: false,
//           user: undefined,
//           isLoading: false,
//         });
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false,
//           isLoggedin: false,
//           user: undefined,
//         });
//       });
//   };

//   render() {
//     const { isLoading, isLoggedin, user } = this.state;
//     const { children } = this.props;
//     if (isLoading) {
//       return <Loading />;
//     }
//     return (
//       <Provider
//         value={{
//           isLoading,
//           isLoggedin,
//           user,
//           handleLogin: this.handleLogin,
//           handleLogout: this.handleLogout,
//           handleSignup: this.handleSignup,
//           handleProfileUpdate: this.handleProfileUpdate,
//           handleUserDelete: this.handleUserDelete,
//         }}
//       >
//         {children}
//       </Provider>
//     );
//   }
// }


// import React, { Component, createContext } from 'react';
// import authService from '../services/authService';

// const AuthContext = createContext();

// const Provider = AuthContext.Provider;

// const AuthConsumer = AuthContext.Consumer;

// export const withAuth = (Comp) => {
//   return class WithAuth extends Component {
    
//     render() {
//       return (
//         <AuthConsumer>
//           { 
//             ({isLoading,
//               isLoggedin,
//               user,
//               handleLogin,
//               handleLogout,
//               handleSignup
//             }) => <Comp {...this.props} isLoading={isLoading} isLoggedin={isLoggedin} user={user} handleLogin={handleLogin} handleLogout={handleLogout} handleSignup={handleSignup} />
//           }
//         </AuthConsumer>
//       )
        
//     }
//   }
// }

// export default class AuthProvider extends Component {
//   state = {
//     isLoggedin: false,
//     user: undefined,
//     isLoading: true,
//   }

//   componentDidMount() {
//     authService.me()
//     .then((user) => {
//         this.setState({
//           isLoggedin: true,
//           user,
//           isLoading: false,
//         })
        
//         console.log('me', user);
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false
//         })
//       })
//   }

//   handleLogin = (user) => {
//     authService.login(user)
//       .then((loggedUser) => {
//         this.setState({
//           isLoggedin: true,
//           user: loggedUser,
//           isLoading: false
//         })
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false
//         })
//       })
//   }
//   handleSignup = (user) =>{
//     authService.signup(user)
//     .then((registredUser) =>{
//       this.setState({
//         isLoggedin: true,
//         user: registredUser,
//         isLoading: false
//       })
//     })
//     .catch(() =>{
//       this.setState({
//         isLoading: false,
//       })
//     })
//   }

//   handleLogout = () => {
//     this.setState({
//       isLoading: true,
//     })
//     authService.logout()
//       .then(() => {
//         this.setState({
//           isLoggedin: false,
//           user: undefined,
//           isLoading: false,
//         })
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false,
//           isLoggedin: false,
//           user: undefined,
//         })
//       })
//   }

//   render() {
//     const { isLoading, isLoggedin, user } = this.state
//     const { children } = this.props;
//     if (isLoading) {
//       return <div>Loading...</div>
//     } else {
//       return (
//         <Provider value={{
//           isLoading,
//           isLoggedin,
//           user,
//           handleLogin: this.handleLogin,
//           handleLogout: this.handleLogout,
//           handleSignup: this.handleSignup
//         }}>
//           {children}
//         </Provider>
//       )
//     }
//   }
// }