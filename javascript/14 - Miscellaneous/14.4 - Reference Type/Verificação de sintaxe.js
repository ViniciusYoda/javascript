let user = {
   name: "John",
   go: function() { console.log(this.name); }
};

(user.go)()