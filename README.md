# WIP: Zentrale-POS

get all users with their saldo
-> saldo = amount of all open invoices + all orders of current accounting period

````
SELECT pos_accounts.*, saldi.saldo FROM `pos_accounts`
LEFT JOIN pos_orders ON pos_orders.pos_account_id = pos_accounts.pos_account_id
LEFT JOIN (SELECT pos_account_id, sum(amount) as saldo FROM (
SELECT pos_account_id, sum(price) AS amount from pos_orders
LEFT JOIN pos_products ON pos_products.pos_products_id = pos_orders.pos_product_id
WHERE pos_order_datetime > (SELECT startdate FROM pos_accounting_periods ORDER BY pos_accounting_period_id DESC LIMIT 1)
GROUP BY pos_account_id
UNION ALL
SELECT pos_receiving_account_id AS pos_account_id, sum(amount) as amount from pos_invoices
WHERE status = 'offen'
GROUP BY pos_account_id
) saldi GROUP BY pos_account_id) saldi ON pos_accounts.pos_account_id = saldi.pos_account_id
GROUP BY name
ORDER BY count(pos_order_id) DESC, name ASC
````
