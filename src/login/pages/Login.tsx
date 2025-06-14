import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode="Login Account"
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container">
                    <div id="kc-registration" className={"text-[18px]"}>
                        <span>
                            <a tabIndex={8} href={url.registrationUrl}>
                                <span className={"text-[#A3A3A3]"}>Request</span><span className={"text-[#E8792C]"}> Access ?</span>
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <hr />
                            <h2>{msg("identity-provider-login-label")}</h2>
                            <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                        <a
                                            id={`social-${p.alias}`}
                                            className={kcClsx(
                                                "kcFormSocialAccountListButtonClass",
                                                providers.length > 3 && "kcFormSocialAccountGridItem"
                                            )}
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                            <span
                                                className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                                                dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                            ></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form" className={"w-full"}>
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                            className={"m-0 space-y-4"}
                        >
                            {!usernameHidden && (
                                <div className={clsx(kcClsx("kcFormGroupClass"), "text-[#1E1E1E] text-[16px] font-medium")}>
                                    <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                        {!realm.loginWithEmailAllowed
                                            ? "Email Address"
                                            : !realm.registrationEmailAsUsername
                                              ? "Email Address"
                                              : "Email Address"}
                                    </label>
                                    <div className={"w-full relative"}>
                                    <input
                                        tabIndex={2}
                                        id="username"
                                        className={clsx(
                                            kcClsx("kcInputClass"),
                                            "block pl-12 focus:outline-none border-1 p-3 border-[#A3A3A3] mt-1 rounded-xl w-full focus:border-[#E8792C] focus:ring focus:ring-[#E8792C] focus:ring-opacity-50 sm:text-sm"
                                        )}
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                        placeholder={"jorgedoe413@aicoding.com"}
                                    />
                                        <i className={"email-icon pointer-events-auto"}></i>
                                    </div>
                                    {messagesPerField.existsError("username", "password") && (
                                        <span
                                            id="input-error"
                                            className={kcClsx("kcInputErrorMessageClass")}
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    )}
                                </div>
                            )}

                            <div className={clsx(kcClsx("kcFormGroupClass"), "text-[#1E1E1E] text-[16px] font-medium leading-[23px]")}>
                                <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                                    {msg("password")}
                                </label>
                                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                    <div className={"relative w-full"}>
                                    <input
                                        tabIndex={3}
                                        id="password"
                                        className={clsx(
                                            kcClsx("kcInputClass"),
                                            "block w-full pl-12  focus:outline-none border-1 p-3 border-[#A3A3A3] mt-1 rounded-xl focus:border-[#E8792C] focus:ring focus:ring-[#E8792C] focus:ring-opacity-50 sm:text-sm"
                                        )}
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                        placeholder={"****************"}
                                    />
                                        <i className={"password-icon pointer-events-auto"}></i>
                                    </div>
                                </PasswordWrapper>
                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </div>

                            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                {/*Remember me checkbox*/}
                                {/*<div id="kc-form-options">*/}
                                {/*    {realm.rememberMe && !usernameHidden && (*/}
                                {/*        <div className="checkbox">*/}
                                {/*            <label>*/}
                                {/*                <input*/}
                                {/*                    tabIndex={5}*/}
                                {/*                    id="rememberMe"*/}
                                {/*                    name="rememberMe"*/}
                                {/*                    type="checkbox"*/}
                                {/*                    defaultChecked={!!login.rememberMe}*/}
                                {/*                />{" "}*/}
                                {/*                {msg("rememberMe")}*/}
                                {/*            </label>*/}
                                {/*        </div>*/}
                                {/*    )}*/}
                                {/*</div>*/}
                                <div className={clsx(kcClsx("kcFormOptionsWrapperClass"), "text-right sm:mb-10")}>
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                <span className={"text-[#E8792C] text-[18px]"}>Forgot Password</span>
                                            </a>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div id="kc-form-buttons" className={clsx(kcClsx("kcFormGroupClass"), "text-white font-bold text-[18px]")}>
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <input
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    className={
                                        "rounded-md bg-[#0F0B3A] p-3 text-sm flex justify-center relative w-full focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    }
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { kcClsx, i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

    return (
        <div className={kcClsx("kcInputGroup")}>
            {children}
            <button
                type="button"
                className={"absolute text-[#0F0B3A] right-3 top-1 pt-2.5"}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i className={clsx(kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow"), "text-[#A3A3A3]")} aria-hidden />
            </button>
        </div>
    );
}
