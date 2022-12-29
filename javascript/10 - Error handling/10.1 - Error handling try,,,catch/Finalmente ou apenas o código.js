function f() {
   try {
      console.log('start');
      return "result";
   } catch (err) {
      /// ...
   } finally {
      console.log('cleanup');
   }
}

f();

function g() {
   try {
      console.log('start');
      throw new Error("an error");
   } catch (err) {
      // ...
      if ("can't handle the error") {
         throw err;
      }

   } finally {
      console.log('cleanup');
   }
}

g();