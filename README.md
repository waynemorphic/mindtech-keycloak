## Set-Up Instructions

These are instructions on how to set-up the custom theme via a Dockerfile.
I will use the following sample `Dockerfile` that you can use to test locally.

```Dockerfile
FROM quay.io/keycloak/keycloak:26.2.3 as builder

## Install the custom theme
ADD --chown=keycloak:keycloak https://github.com/waynemorphic/mindtech-keycloak/releases/download/v1.0.1/keycloak-theme-for-kc-22-to-25.jar /opt/keycloak/providers/keycloak-theme-for-kc-all-other-versions.jar

FROM quay.io/keycloak/keycloak:26.2.3

COPY --from=builder /opt/keycloak /opt/keycloak
WORKDIR /opt/keycloak

ENV KC_HOSTNAME_STRICT=false
ENV KC_HTTPS_PORT=8443
ENV KC_HTTPS_PROTOCOLS=TLSv1.3,TLSv1.2
ENV KC_HTTP_ENABLED=true
ENV KC_HTTP_PORT=8080
ENV KC_BOOTSTRAP_ADMIN_USERNAME=admin
ENV KC_BOOTSTRAP_ADMIN_PASSWORD=admin
ENV BACKGROUND_LOGO_URL=""

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start"]

```

## Changing the Theme

Essentially, if you have a Dockerfile where your Keycloak instance is running, you only need to add the following line:

`ADD --chown=keycloak:keycloak https://github.com/waynemorphic/mindtech-keycloak/releases/download/v1.0.1/keycloak-theme-for-kc-22-to-25.jar /opt/keycloak/providers/keycloak-theme-for-kc-all-other-versions.jar`

I have been using GitHub for version control, so the artifact we are using is the one above. So, after rerunning your Dockerfile, go to your Keycloak
admin panel, navigate to `Realm Settings` > `Themes`. Under `Login Theme`, you should be able to see `Mindtech` from the dropdown list. Select
it, then click save. Your theme will be picked automatically by Keycloak.


## Background Logo

The assumption is that you have deployed the logo to a cloud provider or cloud bucket of some sort. So, in the Dockerfile configuration above,
in the environment variable for `BACKGROUND_LOGO_URL`, you will typically add the URL as a string. 

However, if you do not prefer using this configuration, in your keycloak admin panel, navigate to, `Realm Settings` > `Realm Overrides` > click `Add Translation`. For the key, add, `backgroundLogoUrl` and for the value, add the URL to your logo only without the "". For this to work, first, make sure to have changed the theme to this custom theme.

