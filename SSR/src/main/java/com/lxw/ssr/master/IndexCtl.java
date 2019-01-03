package com.lxw.ssr.master;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@Log4j2
@RestController
@RequestMapping("/main")
public class IndexCtl {

    @RequestMapping("/index")
    private Object indexCtl(HttpServletRequest request) {
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("localName", request.getLocalName());
        hashMap.put("sessionId", request.getRequestedSessionId());
        hashMap.put("cookies", request.getCookies());
        hashMap.put("authType", request.getAuthType());
        hashMap.put("parameterMap", request.getParameterMap());
        log.info(hashMap);
        return hashMap;
    }
}
