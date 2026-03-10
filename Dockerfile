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
