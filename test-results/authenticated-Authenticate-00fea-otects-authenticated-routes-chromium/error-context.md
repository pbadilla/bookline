# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - link "Bookline" [ref=e6] [cursor=pointer]:
        - /url: /
        - img [ref=e7]
        - generic [ref=e10]: Bookline
      - navigation [ref=e11]:
        - link "Home" [ref=e12] [cursor=pointer]:
          - /url: /
          - button "Home" [ref=e13]
        - link [ref=e14] [cursor=pointer]:
          - /url: /cart
          - button [ref=e15]:
            - img [ref=e16]
        - generic [ref=e20]:
          - link "Login" [ref=e21] [cursor=pointer]:
            - /url: /login
            - button "Login" [ref=e22]
          - link "Sign Up" [ref=e23] [cursor=pointer]:
            - /url: /signup?tab=signup
            - button "Sign Up" [ref=e24]
  - main [ref=e25]:
    - generic [ref=e27]:
      - heading "404" [level=1] [ref=e28]
      - heading "This page could not be found." [level=2] [ref=e30]
  - region "Notifications alt+T"
  - alert [ref=e31]
```