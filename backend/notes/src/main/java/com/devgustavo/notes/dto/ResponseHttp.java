package com.devgustavo.notes.dto;

import lombok.Data;

@Data
public class ResponseHttp {

    private Boolean status = true;

    private String message = "Success";

    private Object data;

}
