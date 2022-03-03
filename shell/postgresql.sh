sleep 30



sudo yum update -y
sudo amazon-linux-extras install postgresql9.6



sudo tee /etc/yum.repos.d/pgdg.repo<<EOF
[pgdg13]
name=PostgreSQL 13 for RHEL/CentOS 7 - x86_64
baseurl=http://download.postgresql.org/pub/repos/yum/13/redhat/rhel-7-x86_64
enabled=1
gpgcheck=0
EOF


sudo yum install postgresql13 postgresql13-server -y
sudo /usr/pgsql-13/bin/postgresql-13-setup initdb



sudo systemctl stop postgresql-13.service
sudo systemctl start postgresql-13.service
sudo systemctl enable postgresql-13.service
sudo systemctl status postgresql-13.service



sudo -u postgres psql <<EOF
\x
ALTER ROLE postgres WITH PASSWORD '@uest123';
CREATE DATABASE "postgres";
\connect postgres

CREATE TABLE IF NOT EXISTS public.healthz
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    first_name character varying(250) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(250) COLLATE pg_catalog."default" NOT NULL,
    username character varying(250) COLLATE pg_catalog."default" NOT NULL,
    password character varying(250) COLLATE pg_catalog."default" NOT NULL,
    account_created timestamp without time zone NOT NULL,
    account_updated timestamp without time zone NOT NULL,
    CONSTRAINT healthz_pkey PRIMARY KEY (id),
    CONSTRAINT healthz_first_name_key UNIQUE (first_name),
    CONSTRAINT healthz_last_name_key UNIQUE (last_name),
    CONSTRAINT healthz_username_key UNIQUE (username)
);
\q
EOF


sudo systemctl stop postgresql-13.service
sudo systemctl start postgresql-13.service
sudo systemctl status postgresql-13.service
