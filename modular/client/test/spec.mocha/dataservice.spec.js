describe('dataservice', function () {
    var $controller,
        dataservice,
        $httpBackend,
        $location,
        $q,
        $rootScope,
        $route,
        scope,
        toastr,
        mocks = {};

    beforeEach(function () {
        module('app', loggerFake);
        inject(function (_$controller_, _$httpBackend_, _$location_, _$q_, _$rootScope_, _$route_, _dataservice_, _toastr_) {
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;
            $q = _$q_;
            $rootScope = _$rootScope_;
            $route = _$route_;
            dataservice = _dataservice_;
            toastr = _toastr_;
        });
    });

    beforeEach(function () {
        $httpBackend.when('GET', 'app/dashboard/dashboard.html').respond(200);
        $httpBackend.flush();

        mocks.maaData = [{ 
            data: { results: testctx.getMockAvengers() }
        }];
        // sinon.stub(dataservice, 'getAvengers', function () {
        //     var deferred = $q.defer();
        //     deferred.resolve(testctx.getMockAvengers());
        //     return deferred.promise;
        // });
    });

    describe('getAvengers function', function () {
        it('should return 5 Avengers', function (done) {
            $httpBackend.when('GET', '/api/maa').respond(200, mocks.maaData);
            dataservice.getAvengers().then(function(data) {
                expect(data.length).to.equal(5);
                done();
            })
            $rootScope.$apply();
            $httpBackend.flush();
        });

        it('should contain Black Widow', function (done) {
            $httpBackend.when('GET', '/api/maa').respond(200, mocks.maaData);
            dataservice.getAvengers().then(function(data) {
                var hasBlackWidow = data.some(function isPrime(element, index, array) {
                    return element.name.indexOf('Black Widow') >= 0;
                });
                expect(hasBlackWidow).to.be.true;
                done();
            })
            $rootScope.$apply();
            $httpBackend.flush();
        });
   });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});