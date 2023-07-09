import * as Sentry from '@sentry/node';

export default class SentryHelper {
    public init(): SentryHelper {
        Sentry.init({
            release: "1.0.0",
            environment: process.env.environment,
            dsn: process.env.sentryDsn,
            tracesSampleRate: 1.0
        });

        return this;
    }
}