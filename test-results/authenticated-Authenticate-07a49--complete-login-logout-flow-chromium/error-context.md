# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "Bookline" [ref=e6] [cursor=pointer]:
          - /url: /
          - img [ref=e7]
          - generic [ref=e10]: Bookline
        - generic [ref=e11]: "|"
        - generic [ref=e14]: Bronze Tier
      - navigation [ref=e15]:
        - link "Home" [ref=e16] [cursor=pointer]:
          - /url: /
          - button "Home" [ref=e17]
        - generic [ref=e18]: Welcome, Regular User
        - link [ref=e19] [cursor=pointer]:
          - /url: /cart
          - button [ref=e20]:
            - img [ref=e21]
        - button "Logout" [ref=e26] [cursor=pointer]:
          - img [ref=e27]
          - text: Logout
  - main [ref=e30]:
    - img [ref=e32]
  - region "Notifications alt+T":
    - list:
      - listitem [ref=e34]:
        - img [ref=e36]
        - generic [ref=e39]: Welcome, Regular User!
  - alert [ref=e40]
```