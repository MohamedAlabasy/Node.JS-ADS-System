/* Replace with your SQL commands */
CREATE TYPE deviceTypeENUM AS ENUM ('mobile','desktop','both');
CREATE TYPE adsPlaceENUM AS ENUM ('popup','above-footer','under-services');

CREATE TABLE ads (
    id SERIAL PRIMARY KEY,
    ads text NOT NULL,
    -- ads VARCHAR(2083) NOT NULL,
    views integer DEFAULT 0,
    device_type deviceTypeENUM default 'both',
    ads_place adsPlaceENUM default 'popup',
    start_date timestamp NOT NULL,
    end_date timestamp NOT NULL,
    user_id bigint REFERENCES users(id) NOT NULL
);