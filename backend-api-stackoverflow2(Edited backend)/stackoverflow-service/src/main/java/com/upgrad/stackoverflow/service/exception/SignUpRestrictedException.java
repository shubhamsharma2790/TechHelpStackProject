package com.upgrad.stackoverflow.service.exception;

import java.io.PrintStream;
import java.io.PrintWriter;

/**
 * SignUpRestrictedException is thrown when a user is restricted to register in the application due to repeated username or email.
 */
public class SignUpRestrictedException extends Exception {
    private final String code;
    private final String errorMessage;

    public SignUpRestrictedException(final String code, final String errorMessage) {
        this.code = code;
        this.errorMessage = errorMessage;
    }

    @Override
    public void printStackTrace() {
        super.printStackTrace();
    }

    @Override
    public void printStackTrace(PrintStream s) {
        super.printStackTrace(s);
    }

    @Override
    public void printStackTrace(PrintWriter s) {
        super.printStackTrace(s);
    }

    public String getCode() {
        return code;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

}