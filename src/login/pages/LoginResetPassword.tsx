import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { clsx } from "keycloakify/tools/clsx";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            // infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : "Entrer votre email afin de recevoir les instructions pour recevoir pour rinitialiser votre mots de passe."}
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <p>Entrer votre email afin de recevoir les instructions pour recevoir pour rinitialiser votre mots de passe.</p>
                <div className={clsx(kcClsx("kcFormGroupClass"), "text-[#1E1E1E] text-[16px] font-medium")}>
                    {/*Email Address Label is not in the design spec*/}
                    {/*<div className={kcClsx("kcLabelWrapperClass")}>*/}
                    {/*    <label htmlFor="username" className={kcClsx("kcLabelClass")}>*/}
                    {/*        {!realm.loginWithEmailAllowed*/}
                    {/*            ? msg("username")*/}
                    {/*            : !realm.registrationEmailAsUsername*/}
                    {/*              ? msg("usernameOrEmail")*/}
                    {/*              : msg("email")}*/}
                    {/*    </label>*/}
                    {/*</div>*/}
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <div className={"w-full relative"}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={clsx(
                                kcClsx("kcInputClass"),
                                "block pl-12 focus:outline-none border-1 p-3 border-[#A3A3A3] mt-1 rounded-xl w-full focus:border-[#E8792C] focus:ring focus:ring-[#E8792C] focus:ring-opacity-50 sm:text-sm"
                            )}
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                            placeholder={"jorgedoe413@aicoding.com"}

                        />
                        <i className={"email-icon pointer-events-auto"}></i>
                        </div>
                        {messagesPerField.existsError("username") && (
                            <span
                                id="input-error-username"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("username"))
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                    <div id="kc-form-buttons" className={clsx(kcClsx("kcFormButtonsClass"), "text-white font-bold")}>
                        <input
                            className={
                                "rounded-md bg-[#0F0B3A] p-3 text-sm flex justify-center relative w-full focus:outline-none focus:ring-2 focus:ring-offset-2"
                            }
                            type="submit"
                            value={msgStr("doSubmit")}
                        />
                    </div>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")}>
                            <span>
                                <a href={url.loginUrl}><span className={"text-[#E8792C] mt-2 -mb-8"}>Back to Login</span></a>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
