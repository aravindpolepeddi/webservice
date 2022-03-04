const app = require('./api')
const pool = require('./database')

app.listen(3000, () => {
    console.log("Server on port 3000");
})


/*pool.connect((err) => {
    if (err) throw err;
    pool.query('CREATE TABLE IF NOT EXISTS public.healthz( id uuid NOT NULL DEFAULT uuid_generate_v4(), first_name character varying(250) COLLATE pg_catalog."default" NOT NULL, last_name character varying(250) COLLATE pg_catalog."default" NOT NULL, username character varying(250) COLLATE pg_catalog."default" NOT NULL, password character varying(250) COLLATE pg_catalog."default" NOT NULL, account_created timestamp without time zone NOT NULL, account_updated timestamp without time zone NOT NULL, CONSTRAINT healthz_pkey PRIMARY KEY (id), CONSTRAINT healthz_first_name_key UNIQUE (first_name), CONSTRAINT healthz_last_name_key UNIQUE (last_name), CONSTRAINT healthz_username_key UNIQUE (username));',
        function (error, result) {
            console.log(result);
        });
});*/