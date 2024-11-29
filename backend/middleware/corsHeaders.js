const corsHeaders = (req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with your frontend origin
    res.setHeader("Access-Control-Allow-Credentials", "true");

    console.log("CORS headers set:", {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
    });
    next();
};
export default corsHeaders