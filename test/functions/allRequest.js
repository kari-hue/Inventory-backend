module.exports = (err, res) => {
    res.should.have.status(200);
    res.body.should.be.a('array');
    res.body.length.should.be.eq(1);
    done();
}



