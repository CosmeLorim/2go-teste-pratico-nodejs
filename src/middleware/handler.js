exports.middlewaresHandler = ({ req, res }, ...middlewares) => {
  const ctx = {
    req,
    res
  }

  const stepsHandler = i => {
    if (middlewares && i < middlewares.length) {
      middlewares[i](ctx, () => stepsHandler(i++))
    }
  }
  stepsHandler(0)
}
