import AppsFlyer from './lib';

function af() {
    var param = Array.prototype.slice.call(arguments);
    if (typeof window === 'undefined' || typeof window.AF !== 'function') {
        throw new Error('Appsflyer is not initialized');
    }
    window.AF.apply(undefined, param);
}

module.exports = {
    appsflyer: {
        initialize: function initialize(id) {
            AppsFlyer(id);
        },

        event: function event({ eventName, eventValue }) {
            af('pba', 'event', {
                eventType: 'EVENT',
                eventName,
                eventValue,
            });
        },
    },
};
