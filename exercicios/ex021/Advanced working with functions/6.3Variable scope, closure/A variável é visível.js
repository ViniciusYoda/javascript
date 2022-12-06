function func() {
    // the local variable x is known to the engine from the beginning of the function,
    // but "uninitialized" (unusable) until let ("dead zone")
    // hence the error
  
    console.log(x); // ReferenceError: Cannot access 'x' before initialization
  
    let x = 2;

}

  