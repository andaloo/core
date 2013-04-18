define([
    'qunit',
    'appdelegate'
], function(QUnit, AppDelegate) {
    /** 
     * @name Testing
     * @class [tests/testing] Tests runner.
     * @constructor
     */
    var Testing = {};

    /** Run all the tests (after 1000 ms). */
    Testing.run = function() {
        window.setTimeout(function() {
            AppDelegate.test();
            QUnit.load();
        }, 1000);
    };

    /** 
     * @name TestChain
     * @class [tests/testchain] Tiny tool to chain asynchronous tests.
     * @constructor
     */
    var TestChain = Testing.Chain = {};

    /** Initialize the chain. */
    TestChain.init = function() {
        QUnit.stop();
        this.t = 1000;
        this.expected = 0;
        this.failed = false;
    };

    /** Add an element to the chain.
     * @param before Delay from previous action by an amount of milliseconds
     * @param after Delay to next action by an amount of milliseconds
     * @param fn        Function to call
     * @param nexpected Number of QUnit assertions expected (optional)
     */
    TestChain.add = function(before, after, fn, nexpected) {
        this.t += before;
        if (typeof nexpected === "number") {
            this.expected += nexpected;
        }
        setTimeout(function() {
            if (!this.failed)
                fn();
        }, this.t);
        this.t += after + 50;
    };

    /** Launch execution of the chain.  */
    TestChain.start = function() {
        QUnit.expect(this.expected);
        var endTest = function() {
            QUnit.start();
        }
        this.add(100, 0, endTest);
    };

    return Testing;
});
