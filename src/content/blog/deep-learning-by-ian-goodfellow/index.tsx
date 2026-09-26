export const deepLearningPost = {
  slug: "deep-learning-by-ian-goodfellow",
  title: "Reading Deep Learning by Ian Goodfellow",
  date: "Sep 26, 2026",
  field: "deep learning",
  excerpt:
    "Just finished the book!",
} as const;

export function DeepLearningPostContent() {
  return (
    <div className="space-y-10 text-base leading-8 text-foreground">
      <p>
        Did you know that deep learning was originally called cybernetics (1940s-60s)? I had a pretty broad idea of what deep learning was before reading this book. But after reading this cover-to-cover, I feel like I learnt a lot of niche details  about the field that I otherwise wouldn't have known about. 
</p>
      <section className="space-y-4">
        <h2 className="display text-2xl">Things I liked about this book</h2>
        <p>
          In a traditional pipeline, a person chooses which measurements should matter. A deep model instead learns intermediate features from examples. Early transformations can respond to simple patterns; later ones combine them into features that are useful for the task. The hierarchy is not guaranteed to be meaningful, but it gives optimization a way to discover representations that hand-designed rules may miss.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="display text-2xl">Some of my most important takeaways from the book</h2>
        <p>
          A feedforward network can be viewed as a sequence of functions. Each layer transforms its input, applies a nonlinearity, and passes the result onward. This compact notation makes the chain rule central: the effect of an early parameter on the final loss passes through every later layer.
        </p>
        <div className="overflow-x-auto border-l-2 border-accent bg-white px-5 py-5">
          <math display="block" aria-label="The derivative of the loss with respect to an early-layer parameter is the product of derivatives through each layer">
            <mrow>
              <mfrac>
                <mrow><mi>∂</mi><mi mathvariant="script">L</mi></mrow>
                <mrow><mi>∂</mi><msub><mi>θ</mi><mn>1</mn></msub></mrow>
              </mfrac>
              <mo>=</mo>
              <mfrac>
                <mrow><mi>∂</mi><mi mathvariant="script">L</mi></mrow>
                <mrow><mi>∂</mi><msub><mi>h</mi><mi>n</mi></msub></mrow>
              </mfrac>
              <munderover><mo>∏</mo><mrow><mi>ℓ</mi><mo>=</mo><mn>2</mn></mrow><mi>n</mi></munderover>
              <mfrac>
                <mrow><mi>∂</mi><msub><mi>h</mi><mi>ℓ</mi></msub></mrow>
                <mrow><mi>∂</mi><msub><mi>h</mi><mrow><mi>ℓ</mi><mo>−</mo><mn>1</mn></mrow></msub></mrow>
              </mfrac>
              <mfrac>
                <mrow><mi>∂</mi><msub><mi>h</mi><mn>1</mn></msub></mrow>
                <mrow><mi>∂</mi><msub><mi>θ</mi><mn>1</mn></msub></mrow>
              </mfrac>
            </mrow>
          </math>
        </div>
        <p>
          This product explains both the efficiency of backpropagation and one of its difficulties: repeated derivatives can shrink or grow dramatically. Depth gives a model expressive structure, while initialization, nonlinearities, and optimization determine whether useful learning signals can travel through it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="display text-2xl">How I've applied these concepts</h2>
        <p>
          Training usually means minimizing an average loss over examples, perhaps with a penalty that discourages overly complex parameters. The equation is simple; the choices inside it are not. The loss encodes what counts as an error, the data distribution defines what the model sees, and regularization expresses which solutions we prefer when the data cannot decide.
        </p>
        <div className="overflow-x-auto border-l-2 border-accent bg-white px-5 py-5">
          <math display="block" aria-label="The objective is the average example loss plus a regularization penalty">
            <mrow>
              <mi>J</mi><mo>(</mo><mi>θ</mi><mo>)</mo>
              <mo>=</mo>
              <mfrac><mn>1</mn><mi>m</mi></mfrac>
              <munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>m</mi></munderover>
              <mi mathvariant="script">L</mi><mo>(</mo><mi>f</mi><mo>(</mo><msup><mi>x</mi><mrow><mo>(</mo><mi>i</mi><mo>)</mo></mrow></msup><mo>;</mo><mi>θ</mi><mo>)</mo><mo>,</mo><msup><mi>y</mi><mrow><mo>(</mo><mi>i</mi><mo>)</mo></mrow></msup><mo>)</mo>
              <mo>+</mo><mi>λ</mi><mi>Ω</mi><mo>(</mo><mi>θ</mi><mo>)</mo>
            </mrow>
          </math>
        </div>
        <p>
          Thinking in terms of this objective keeps evaluation honest. A lower training loss is only evidence that the model fits its examples better. It does not, by itself, show that the representation will generalize, that the data are representative, or that the task was framed well.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="display text-2xl">Questions for the next reading session</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-accent">
          <li>Which assumptions make gradient-based optimization practical for a particular model?</li>
          <li>How do data, model capacity, and regularization trade off when examples are limited?</li>
          <li>When does a learned representation help, and when does it merely make a model harder to interpret?</li>
        </ul>
      </section>

      <p className="border-t-2 border-border pt-6 text-sm text-muted-foreground">
        These are independent reading notes, not a summary or substitute for the textbook. I plan to revise them as I work through examples and experiments.
      </p>
    </div>
  );
}