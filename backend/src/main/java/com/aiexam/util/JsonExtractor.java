package com.aiexam.util;

public class JsonExtractor {

    private JsonExtractor() {
    }

    public static String extract(String text) {

        int start = text.indexOf("{");

        int end = text.lastIndexOf("}");

        if (start == -1 || end == -1) {

            throw new RuntimeException("JSON not found.");

        }

        return text.substring(start, end + 1);

    }

}