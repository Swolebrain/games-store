process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Game = require('../Games.js').Game;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let expect = chai.should();

chai.use(chaiHttp);

describe('Tests for Games API', function(){
  beforeEach(function(done){
    Game.remove({}, function(err){
      if (!err) done();
    });
  });

  describe('/GET request for games', function(){
    it("should get a games array", function(done){
      chai.request(server)
      .get('/games')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      })
    });
  });

  describe('/POST route for games', function(){
    it("should post a game", function(done){
      let validGame = {
        name: "Another generic FPS",
        genre: "fps",
        year: "2016",
        imageUrls: ["x", "y", "z"],
        description: "This game is about killing some aliens.",
        minimumRequirements: {cpu: "i5"},
        recommendedRequirements: {cpu: "i5"},
        price: "49.99",
      };
      chai.request(server)
      .post('/games')
      .send(validGame)
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("imageUrls");
        res.body.imageUrls.should.be.a("array");
        res.body.imageUrls.length.should.be.eql(3);
        res.body.should.have.property("description");
        res.body.description.should.be.eql("This game is about killing some aliens.")
        res.body.should.have.property("minimumRequirements");
        res.body.minimumRequirements.should.be.a("object");
        res.body.minimumRequirements.should.have.property("cpu");
        res.body.minimumRequirements.cpu.should.be.eql("i5");
        res.body.should.have.property("recommendedRequirements");
        res.body.recommendedRequirements.should.be.a("object");
        res.body.recommendedRequirements.should.have.property("cpu");
        res.body.recommendedRequirements.cpu.should.be.eql("i5");
        res.body.should.have.property("price");
        res.body.price.should.be.eql("49.99");
        done();
      });
    });
    // it("should fail to post a game if req.body is empty", function(done){
    //
    // });
    // it("should fail to post a game if name is missing", function(done){
    //
    // });
    // it("should fail to post a game if description is missing", function(done){
    //
    // });
  });


});
