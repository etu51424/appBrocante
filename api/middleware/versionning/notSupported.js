const notSupportedVersion = (req, res) => {
    const {version} = req.params;
    res.status(404).json({
        error: "API version not supported",
        message: `The API version '${version}' is not implemented.`,
    })
}

export default notSupportedVersion;