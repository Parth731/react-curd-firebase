interface User {
  // Define your user properties here
}

export interface AuthState {
  currentUser: User | null;
}

export interface Action {
  type: string;
  payload: any;
}

const INITIAL_STATE: AuthState = {
  currentUser: null,
};
